import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [ProductsModule, 
    MongooseModule.forRoot('mongodb+srv://renanbotasse:Walk1234@zerocluster.vfal5mg.mongodb.net/?retryWrites=true&w=majority&appName=zeroCluster')
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
