import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DbService } from './db/db.service';
import { DbModule } from './db/db.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true
        }),
        DbModule
    ],
    controllers: [],
    providers: [DbService]
})
export class AppModule {}
