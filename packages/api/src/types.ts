import { z } from "zod";

export const Team = ["red", "blue"] as const;
export const TeamEnumSchema = z.enum(Team);
export type TeamEnum = z.infer<typeof TeamEnumSchema>;

export const BuzMessageSchema = z.object({
	type: z.literal("buz"),
	team: TeamEnumSchema,
});
export type BuzMessage = z.infer<typeof BuzMessageSchema>;

export const ResetBuzSchema = z.object({ type: z.literal("resetBuzzer") });
export type ResetBuz = z.infer<typeof ResetBuzSchema>;

export const ScoreMessageSchema = z.object({
	type: z.literal("score"),
	team: TeamEnumSchema,
	value: z.int(),
});
export type ScoreMessage = z.infer<typeof ScoreMessageSchema>;

export const RegisterAdminMessageSchema = z.object({
	type: z.literal("registerAdmin"),
});
export type RegisterAdminMessage = z.infer<typeof RegisterAdminMessageSchema>;

export const MessageSchema = z.discriminatedUnion("type", [
	BuzMessageSchema,
	ResetBuzSchema,
	ScoreMessageSchema,
	RegisterAdminMessageSchema,
]);
export type Message = z.infer<typeof MessageSchema>;

export const ScoreResponseSchema = z.object({
	type: z.literal("scoreResponse"),
	team: TeamEnumSchema,
	value: z.int(),
});
export type ScoreResponse = z.infer<typeof ScoreResponseSchema>;

export const BuzResponseSchema = z.object({
	type: z.literal("buzResponse"),
	team: TeamEnumSchema,
});
export type BuzResponse = z.infer<typeof BuzResponseSchema>;

export const ResponseSchema = z.discriminatedUnion("type", [
	ScoreResponseSchema,
	BuzResponseSchema,
]);
export type Response = z.infer<typeof ResponseSchema>;
