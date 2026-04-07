import { useState, useEffect, useRef } from 'react';
import { FetchSchools } from '../services/schoolService';
import { School, SchoolRaw } from '../models/School';
import { Language } from '../models/Language';

function mapSchools(raw: SchoolRaw[], language: Language): School[] {
    return raw.map((item) => ({
        schoolNo: item["SCHOOL NO."],
        category: language === 'en' ? item["ENGLISH CATEGORY"] : item["中文類別"],
        name: language === 'en' ? item["ENGLISH NAME"] : item["中文名稱"],
        address: language === 'en' ? item["ENGLISH ADDRESS"] : item["中文地址"],
        longitude: item["LONGITUDE"],
        latitude: item["LATITUDE"],
        gender: language === 'en' ? item["STUDENTS GENDER"] : item["就讀學生性別"],
        session: language === 'en' ? item["SESSION"] : item["學校授課時間"],
        district: language === 'en' ? item["DISTRICT"] : item["分區"],
        financeType: language === 'en' ? item["FINANCE TYPE"] : item["資助種類"],
        schoolLevel: language === 'en' ? item["SCHOOL LEVEL"] : item["學校類型"],
        telephone: item["TELEPHONE"],
        fax: item["FAX NUMBER"],
        website: item["WEBSITE"],
        religion: language === 'en' ? item["RELIGION"] : item["宗教"],
    }));
}

export function useSchools(language: Language) {
    const [schools, setSchools] = useState<School[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const rawDataRef = useRef<SchoolRaw[]>([]);

    // Re-map when language changes (only if data has been loaded)
    useEffect(() => {
        if (rawDataRef.current.length > 0) {
            setSchools(mapSchools(rawDataRef.current, language));
        }
    }, [language]);

    const loadSchools = async (forceRefresh: boolean = false) => {
        setLoading(true);
        setError(null);
        try {
            const raw = await FetchSchools(forceRefresh);
            rawDataRef.current = raw;
            setSchools(mapSchools(raw, language));
        } catch (err) {
            setError("Failed to load schools");
        } finally {
            setLoading(false);
        }
    };

    return { schools, loading, error, loadSchools };
}
