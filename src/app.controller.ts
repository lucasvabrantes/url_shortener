import { Body, Controller, Get, Param, Post, Req } from "@nestjs/common";
import { AppService } from "./app.service";
import { UrlDto } from "./dto/url.dto";

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Post()
    create(@Body() urlDto: UrlDto) {
        return this.appService.create(urlDto);
    }

    @Get(":hash")
    retrieve(@Param("hash") hash: string) {
        return this.appService.retrieve(hash);
    }
}
