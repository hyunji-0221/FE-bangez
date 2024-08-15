import axios from 'axios';
import { Property } from '@/module/property/Property';
import { API } from '@/app/api/common/API';


import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const properties = await fetchProperties();
    return NextResponse.json(properties);
  } catch (error) {
    console.error('Failed to fetch data from the server', error);
    return NextResponse.json({ error: 'Failed to fetch data from the server' }, { status: 500 });
  }
}

// const fetchProperties = async (): Promise<Property[]> => {
//   try {
//     const API_OFFICETELS = `${API.LANDSERVER}/officetels`;
//     const API_APARTMENTS = `${API.LANDSERVER}/apartments`;

//     const [officetelsResponse, apartmentsResponse] = await Promise.all([
//       axios.get(API_OFFICETELS),
//       axios.get(API_APARTMENTS),
//     ]);

//     let properties = [...officetelsResponse.data, ...apartmentsResponse.data];

//     return properties.map(property => ({
//       ...property,
//       tagList: (property.tagList as string[]).map((tag: string) => tag.replace(/^\['|'\]$/g, '').split("', '"))
//     }));
//   } catch (error) {
//     console.error('Failed to fetch data from the server', error);
//     return [];
//   }
// };

// export default fetchProperties;

const fetchProperties = async (): Promise<Property[]> => {
  try {
    const API_OFFICETELS = `${API.LANDSERVER}/officetels`;
    const API_APARTMENTS = `${API.LANDSERVER}/apartments`;

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