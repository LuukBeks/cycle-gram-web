import { Injectable, Logger } from '@nestjs/common';
import { IBicycle, ICycleRoute } from '@cycle-gram-web-main/shared/api';
import { Neo4jService } from 'nest-neo4j/dist';

@Injectable()
export class NeoService {
  TAG = 'NeoService';
  private logger = new Logger(this.TAG);

  constructor(private readonly neo4jService: Neo4jService) {}

  async addOrUpdateSort(sort: string) {
    this.logger.log(`Adding or updating sort ${sort}`);
    this.neo4jService.write(
      `MERGE (s:Sort {sort: "${sort}"})`
    );
  }

  async addOrUpdateBicycle(bicycle: IBicycle) {
    this.logger.log(`Adding or updating bicycle ${bicycle.id}`);
    await this.addOrUpdateSort(bicycle.sort);
    await this.neo4jService.write(
      `MERGE (b:Bicycle {id: "${bicycle.id}"}) 
       SET b = {id: "${bicycle.id}", bicycleName: "${bicycle.bicycleName}", brand: "${bicycle.Brand}", sort: "${bicycle.sort}" }
       WITH b 
       OPTIONAL MATCH (b)-[r:SORT_BICYCLE]->(s:Sort) 
       DELETE r 
       WITH b MATCH (s:Sort {sort: "${bicycle.sort}"}) MERGE (b)-[:SORT_BICYCLE]->(s)`
    );
  }
  
  async addOrUpdateCycleRoute(cycleroute: ICycleRoute) {
    this.logger.log(`Adding or updating cycleroute ${cycleroute.id}`);
    await this.addOrUpdateSort(cycleroute.sort);
    await this.neo4jService.write(
      `MERGE (c:CycleRoute {id: "${cycleroute.id}"}) 
       ON CREATE SET c = {id: "${cycleroute.id}", routeName: "${cycleroute.routeName}", sort: "${cycleroute.sort}" }
       ON MATCH SET c.routeName = "${cycleroute.routeName}", c.sort = "${cycleroute.sort}"
       WITH c 
       OPTIONAL MATCH (c)<-[r:RECOMMENDED_ROUTE]-(s:Sort) 
       DELETE r 
       WITH c 
       MATCH (s:Sort {sort: "${cycleroute.sort}"}) 
       MERGE (s)-[:RECOMMENDED_ROUTE]->(c)`
    );
  }
  
  async deleteBicycle(bicycle: IBicycle) {
    this.logger.log(`Deleting bicycle ${bicycle.id}`);
    this.logger.log(`MATCH (b:Bicycle {id: "${bicycle.id}"}) DETACH DELETE b`);
    await this.neo4jService.write(
      `MATCH (b:Bicycle {id: "${bicycle.id}"}) DETACH DELETE b`
    );
  }
  
  async deleteCycleRoute(cycleroute: ICycleRoute) {
    this.logger.log(`Deleting cycleroute ${cycleroute.id}`);
    await this.neo4jService.write(
      `MATCH (c:CycleRoute {id: "${cycleroute.id}"}) DETACH DELETE c`
    );
  }
}
