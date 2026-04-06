import { RSVPService } from './rsvp.service';
import { RSVPStatus } from '@prisma/client';

describe('RSVPService', () => {
  let service: RSVPService;

  beforeEach(() => {
    service = new RSVPService();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('classifyResponse', () => {
    it('should classify "Yes" correctly', () => {
      expect(service.classifyResponse('Yes, I will come')).toBe(RSVPStatus.CONFIRMED);
      expect(service.classifyResponse('Aaunga zaroor')).toBe(RSVPStatus.CONFIRMED);
      expect(service.classifyResponse('Ji han main aaunga')).toBe(RSVPStatus.CONFIRMED);
    });

    it('should classify "No" correctly', () => {
      expect(service.classifyResponse('No, sorry')).toBe(RSVPStatus.DECLINED);
      expect(service.classifyResponse('Nahi aa sakta')).toBe(RSVPStatus.DECLINED);
    });

    it('should classify "Maybe" correctly', () => {
      expect(service.classifyResponse('Maybe, let you know')).toBe(RSVPStatus.MAYBE);
      expect(service.classifyResponse('Dekhunga')).toBe(RSVPStatus.MAYBE);
    });

    it('should return AMBIGUOUS for unclear responses', () => {
      expect(service.classifyResponse('What is the venue?')).toBe(RSVPStatus.AMBIGUOUS);
    });
  });
});
