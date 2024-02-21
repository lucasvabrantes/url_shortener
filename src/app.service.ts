import {
    ConflictException,
    Injectable,
    NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "./database/prisma.service";
import { UrlDto } from "./dto/url.dto";
import { Url } from "./entity/url.entity";
import { Response } from "express";

@Injectable()
export class AppService {
    constructor(private prisma: PrismaService) {}

    async create(urlDto: UrlDto) {
        const urlExists = await this.prisma.url.findFirst({
            where: { url: urlDto.url },
        });
        if (urlExists) {
            throw new ConflictException("Url already exists!");
        }

        const hash = Math.random().toString(36).slice(7);
        let url = new Url();
        const newUrl = "http://localhost:3000/" + hash;
        Object.assign(url, { ...urlDto, newUrl });

        await this.prisma.url.create({ data: { ...url } });

        return { newUrl };
    }

    async retrieve(hash: string, res: Response): Promise<void> {
        const newUrl = "http://localhost:3000/" + hash;
        const urlExists = await this.prisma.url.findFirst({
            where: { newUrl },
        });
        if (!urlExists) {
            throw new NotFoundException("Url not found!");
        }

        const today: Date = new Date(Date.now());
        const urlDate: Date = urlExists.createdAt;
        const oneDay = 1000 * 60 * 60 * 24;
        const differenceInMs = Math.abs(today.getTime() - urlDate.getTime());
        const differenceInDays = Math.round(differenceInMs / oneDay) + 1;

        if (differenceInDays > 30) {
            throw new NotFoundException(
                "Creation Date is greater than 30 dayss. Expired URL."
            );
        }
        const originalUrl = urlExists.url;
        return res.redirect(originalUrl);
    }
}
