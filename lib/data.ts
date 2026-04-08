import fs from 'fs';
import path from 'path';

/**
 * Utility to reliably read JSON files dynamically at server-render time without
 * failing if the user hasn't created the file yet.
 */
export function getLocalData(schemaPath: string, defaultStructure: any) {
  try {
    const filePath = path.join(process.cwd(), 'content', schemaPath);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    console.warn(`Could not read file at content/${schemaPath}, returning default.`);
    return defaultStructure;
  }
}
