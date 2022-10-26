/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cost, CostsDocument } from 'src/schemas/costs.schema';
import { CreateCostsDto } from './dto/create-costs.dto';
import { UpdateCostsDto } from './dto/update-costs.dto';

@Injectable()
export class CostsService {
  constructor(
    @InjectModel(Cost.name) private costsModel: Model<CostsDocument>,
  ) { }

  async findAll(): Promise<Cost[]> {
    return this.costsModel.find();
  }

  async findOne(id: string): Promise<Cost> {
    return this.costsModel.findOne({ _id: id });
  }


  async create(createCostsDto: CreateCostsDto): Promise<Cost> {
    const createdCost = new this.costsModel(createCostsDto)
    return createdCost.save();
  }

  async update(updateCostsDto: UpdateCostsDto, id: string): Promise<Cost> {
    await this.costsModel.updateOne(
      { _id: id },
      {
        $set: {
          ...updateCostsDto,
        },
      },
    );
    return this.findOne(id)
  }

  async delete(id: string): Promise<void> {
    await this.costsModel.deleteOne({ _id: id })
  }
}

