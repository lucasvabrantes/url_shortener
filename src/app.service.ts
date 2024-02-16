import {
    ConflictException,
    Injectable,
    NotFoundException,
} from "@nestjs/common";
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
        if (urlExists) {
            throw new ConflictException("Url already exists!");
        }

        const hash = Math.random().toString(36).slice(8);
        let url = new Url();
        Object.assign(url, { ...urlDto, hash });
        const urlWithHash = await this.prisma.url.create({ data: { ...url } });

        return urlWithHash;
    }

    async retrieve(hash: string): Promise<string> {
        const urlExists = await this.prisma.url.findFirst({
            where: { hash },
        });

        if (!urlExists) {
            throw new NotFoundException("Url not found!");
        }

        const originalUrl = urlExists.url;
        return originalUrl;
    }
}
