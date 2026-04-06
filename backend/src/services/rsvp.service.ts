import { Injectable } from '@nestjs/common';
import { RSVPStatus } from '@prisma/client';

@Injectable()
export class RSVPService {
  /**
   * Classifies a WhatsApp reply to an invitation into a recognized RSVP status.
   * Based on specific Indian/Kerala context (including 'ha' for yes).
   */
  classifyResponse(message: string): RSVPStatus {
    const msg = message.toLowerCase().trim();

    // Spec patterns: Confirmed, Declined, Maybe
    const YES_PATTERNS = [/^yes/, /^attending/, /^confirm/, /^\bha\b/, /^will come/];
    const NO_PATTERNS = [/^no/, /^not coming/, /^can't/, /^cannot/, /^sorry/];
    const MAYBE_PATTERNS = [/^maybe/, /^possibly/, /^not sure/, /^depends/];

    if (YES_PATTERNS.some((p) => p.test(msg))) {
      return RSVPStatus.CONFIRMED;
    }

    if (NO_PATTERNS.some((p) => p.test(msg))) {
      return RSVPStatus.DECLINED;
    }

    if (MAYBE_PATTERNS.some((p) => p.test(msg))) {
      return RSVPStatus.MAYBE;
    }

    // Default: Triggers manual review in the dashboard as 'AMBIGUOUS'
    return RSVPStatus.AMBIGUOUS;
  }

  /**
   * Extracts a numeric headcount from a message.
   * Handles direct digits or common word representations from 1-10.
   */
  extractHeadcount(message: string): number | null {
    const msg = message.toLowerCase().trim();

    // Case 1: Check for direct numeric digits (e.g., '3' or 'Myself and 2 wife' -> extracts 2/3)
    const numMatch = msg.match(/\b(\d+)\b/);
    if (numMatch) {
      return parseInt(numMatch[1], 10);
    }

    // Case 2: Word-to-number mapping (as per spec section 3.6.3)
    const wordMap: Record<string, number> = {
      one: 1,
      two: 2,
      three: 3,
      four: 4,
      five: 5,
      six: 6,
      seven: 7,
      eight: 8,
      nine: 9,
      ten: 10,
    };

    const wordMatch = msg.match(/\b(one|two|three|four|five|six|seven|eight|nine|ten)\b/);
    if (wordMatch) {
      return wordMap[wordMatch[1]];
    }

    return null;
  }
}
