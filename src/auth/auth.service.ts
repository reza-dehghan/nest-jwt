import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity.js';
import { RegisterDto } from './dto/register.dto.js';
import bcrypt from 'bcrypt'
import { LoginDto } from './dto/login.dto.js';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {

constructor(
    @InjectRepository(User)
    private readonly userRepository:Repository<User>,

    private readonly jwtService:JwtService
){}
    
async register(registerDto:RegisterDto){
    const user = await this.userRepository.findOne({
        where:{
            email:registerDto.email,
        }
    });
    if (user){
        throw new ConflictException('email already exist');
    }

    const hashPassword = await bcrypt.hash(registerDto.password,10);

    const newuser = this.userRepository.create({
        name:registerDto.name,
        email:registerDto.email,
        password:hashPassword,
    });
    const result = await this.userRepository.save(newuser);
    return result;

}

async login(loginDto:LoginDto){
    const user = await this.userRepository.findOne({
        where:{
            email:loginDto.email,
        }
    })
    if (!user){
        throw new NotFoundException('Invalid email or password');
    }

    const password = bcrypt.compare(loginDto.password,user.password);

    if (!password){
        throw new UnauthorizedException('Invalid email or password')
    }

    const token = this.jwtService.sign({
        sub:user.id,
        email:user.email,
        role:user.role
    });
    return{
        access_token:token,
    };
    

}

}
