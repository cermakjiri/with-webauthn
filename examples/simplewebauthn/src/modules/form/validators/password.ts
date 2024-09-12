import { z } from 'zod';

import { required } from './general';

export const newPassword = required.pipe(z.string().min(10));
