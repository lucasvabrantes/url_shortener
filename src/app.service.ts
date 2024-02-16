import { ConflictException, Injectable } from "@nestjs/common";
import { PrismaService } from "./database/prisma.service";
import { UrlDto } from "./dto/url.dto";
import { Url } from "./entity/url.entity";

@Injectable()
export class AppService {
    constructor(private prisma: PrismaService) {}

    async create(urlDto: UrlDto) {
        const urlExists = await this.prisma.url.findFirst({
            where: { url: urlDto.url },
        });

        console.log(urlExists);

        if (urlExists) {
            throw new ConflictException("Url already exists!");
        }

        const hash = `https://localhost:3000/${Math.random().toString(36).slice(8)}`;
        let url = new Url();
        Object.assign(url, { ...urlDto, hash });
        const urlWithHash = await this.prisma.url.create({ data: { ...url } });

        return urlWithHash;
    }

    async retrieve(urlDto: UrlDto): Promise<UrlDto> {
        return await this.prisma.url.findFirst({ where: { hash: urlDto.url } });
    }
}
