import { z } from "zod";
import { CurrencySchema } from "../schema/cripto-schema";

export type Currency = z.infer<typeof CurrencySchema>