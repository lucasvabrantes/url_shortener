import { Body, Controller, Get, Post } from "@nestjs/common";
import { AppService } from "./app.service";
import { UrlDto } from "./dto/url.dto";

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Post()
    create(@Body() urlDto: UrlDto) {
        return this.appService.create(urlDto);
    }

    @Get()
    get(@Body() urlDto: UrlDto) {
        return this.appService.retrieve(urlDto);
    }
}
