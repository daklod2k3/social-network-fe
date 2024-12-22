"use server"

export async function Api(){
  const baseUrl = process.env.API_URL;
  return {
    baseUrl
  }
}