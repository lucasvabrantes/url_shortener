import { Body, Controller, Get, Param, Post, Res } from "@nestjs/common";
import { AppService } from "./app.service";
import { UrlDto } from "./dto/url.dto";
import { Response } from "express";

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Post()
    create(@Body() urlDto: UrlDto) {
        return this.appService.create(urlDto);
    }

    @Get(":hash")
    retrieve(@Param("hash") hash: string, @Res() res: Response) {
        return this.appService.retrieve(hash, res);
    }
}
