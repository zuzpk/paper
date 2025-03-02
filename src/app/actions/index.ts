"use server"
import fs from "fs"
import path from "path"

export const relativePath = async (filePath: string) => {
    return path.relative(process.cwd(), filePath)
}

export const scanPaperFiles = async (dir?: string, foundFiles: string[] = []): Promise<string[]> => {
    
    const entries = fs.readdirSync(dir || path.join(process.cwd(), `src/app/papers`), { withFileTypes: true });
    
    for (const entry of entries) {
        foundFiles.push(entry.name)
    }
  
    return foundFiles;

}