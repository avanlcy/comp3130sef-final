import { File, Paths } from 'expo-file-system/next';
import { SchoolRaw } from '../models/School';

const SCHOOL_URL = "http://www.edb.gov.hk/attachment/en/student-parents/sch-info/sch-search/sch-location-info/SCH_LOC_EDB.json";

const cacheFile = new File(Paths.cache, "schools.json");

async function loadFromCache(): Promise<SchoolRaw[] | null> {
    if (!cacheFile.exists) return null;
    const content = await cacheFile.text();
    return JSON.parse(content) as SchoolRaw[];
}

function saveToCache(data: SchoolRaw[]): void {
    cacheFile.write(JSON.stringify(data));
}

async function FetchSchools(): Promise<SchoolRaw[]> {
    try {
        const cached = await loadFromCache();
        if (cached) {
            return cached;
        }

        const response = await fetch(SCHOOL_URL);
        const data = await response.json() as SchoolRaw[];

        saveToCache(data);

        return data;
    } catch (error) {
        console.error("Failed to fetch schools:", error);
        throw error;
    }
}

export {
    FetchSchools
};
