import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SummarizeHighlightDto } from './dto/summarize-highlight.dto';
import { Highlight, HighlightDocument } from './schemas/highlight.schema';
import axios from 'axios';
import { FindUserHighlightsDto } from './dto/find-user-highlights.dto';
import { EditHighlightDto } from './dto/edit-highlight.dto';

@Injectable()
export class HighlightsService {
  private readonly openAiApi = {
    url: 'https://api.openai.com/v1/engines/text-davinci-002/completions',
    headers: {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
    },
  };

  constructor(
    @InjectModel(Highlight.name)
    private readonly highlightModel: Model<HighlightDocument>,
  ) {}

  private extractWordsFromString(str) {
    const regex = /(\w+)/g;
    const words = str.match(regex);
    return words ? words.map((word) => word.toLowerCase()) : [];
  }

  private async generateSummary(text: string): Promise<string> {
    const response = await axios.post(
      this.openAiApi.url,
      {
        prompt: `summarize this text, making it as concise as possible: \n${text}`,
        temperature: 0.7,
        max_tokens: 200,
        top_p: 0.5,
        frequency_penalty: 0,
        presence_penalty: 0,
      },
      this.openAiApi.headers,
    );
    return response.data.choices[0].text.trim();
  }

  private async generateTags(text: string): Promise<string[]> {
    const response = await axios.post(
      this.openAiApi.url,
      {
        prompt: `Tell me 5 words that describe this text : \n${text}`,
        max_tokens: 10,
        n: 1,
      },
      this.openAiApi.headers,
    );

    return this.extractWordsFromString(response.data.choices[0].text.trim());
  }

  async summarize(
    userID: string,
    { text }: SummarizeHighlightDto,
  ): Promise<Highlight> {
    let summary = 'summa';
    let tags = [];
    try {
      const data = await Promise.all([
        this.generateSummary(text),
        this.generateTags(text),
      ]);
      summary = data[0];
      tags = data[1];
    } catch (error) {
      throw new InternalServerErrorException(
        'Error processing data. Please try again later',
      );
    }

    const newHighlight = new this.highlightModel({
      userID,
      text,
      label: `Summary-${Date.now()}`,
      summary,
      tags,
    });
    return newHighlight.save();
  }

  async findUserHighlights(
    userID: string,
    { tags = [], sortBy = 'newest' }: FindUserHighlightsDto,
  ): Promise<Highlight[]> {
    const query: any = { userID };
    if (tags.length > 0) {
      query.tags = { $in: tags.map((tag) => tag.toLowerCase()) };
    }
    return this.highlightModel
      .find(query)
      .sort({ createdAt: sortBy === 'oldest' ? 1 : -1 })
      .exec();
  }

  async update(userID: string, data: EditHighlightDto): Promise<Highlight> {
    const { id: _id, ...updateData } = data;
    return this.highlightModel.findOneAndUpdate({ _id, userID }, updateData, {
      new: true,
    });
  }

  async delete(userID: string, id: string): Promise<Highlight> {
    return this.highlightModel.findOneAndDelete({ _id: id, userID });
  }
}
