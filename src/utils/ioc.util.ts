import {ContainerBuilder} from 'node-dependency-injection'
// import {WhatsAppClient }from './whatsapExternal.util'
import {LocalDataSource} from './dataSource.util'

const container = new ContainerBuilder()

// container.register('whatsap-client',WhatsAppClient);
container.register('localDataSource',LocalDataSource);


export default container;
