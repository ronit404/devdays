/**
 * Publisher data access helpers for the static site catalog.
 * These queries read from the local SQLite database during build-time page generation,
 * while keeping the database dependency injectable for unit tests.
 */
import { asc } from 'drizzle-orm';
import type { Database } from './db';
import { publishers } from '../../db/schema';
import type { Publisher } from '../types/game';

/**
 * Fetch all publishers sorted alphabetically by name.
 *
 * @param db - Shared Drizzle database connection used to read publisher records.
 * @returns Promise resolving to every publisher in name order.
 */
export async function getAllPublishers(db: Database): Promise<Publisher[]> {
    const rows = await db
        .select({
            id: publishers.id,
            name: publishers.name,
        })
        .from(publishers)
        .orderBy(asc(publishers.name));

    return rows.map((row) => ({
        id: row.id,
        name: row.name,
    }));
}
