"use client";

import { Property } from '@/module/property/Property';
import axios from 'axios';

const fetchProperties = async (): Promise<Property[]> => {
  try {
    const API_OFFICETELS = `${process.env.NEXT_PUBLIC_API_LANDSERVER}/officetels`;
    const API_APARTMENTS = `${process.env.NEXT_PUBLIC_API_LANDSERVER}/apartments`;

    const [officetelsResponse, apartmentsResponse] = await Promise.all([
      axios.get(API_OFFICETELS),
      axios.get(API_APARTMENTS),
    ]);

    let properties = [...officetelsResponse.data, ...apartmentsResponse.data];

    return properties.map(property => ({
      ...property,
      tagList: (property.tagList as string[]).map((tag: string) => tag.replace(/^\['|'\]$/g, '').split("', '"))
    }));
  } catch (error) {
    console.error('Failed to fetch data from the server', error);
    return [];
  }
};

export default fetchProperties;