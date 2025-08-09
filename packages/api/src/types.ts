import { z } from "zod";

export const Team = ["red", "blue"] as const;
export const TeamEnumSchema = z.enum(Team);
export type TeamEnum = z.infer<typeof TeamEnumSchema>;

// Messages: Browser -> Server
export const BuzMessageSchema = z.object({
	type: z.literal("buz"),
	team: TeamEnumSchema,
});
export type BuzMessage = z.infer<typeof BuzMessageSchema>;

export const ResetBuzSchema = z.object({ type: z.literal("resetBuzzer") });
export type ResetBuz = z.infer<typeof ResetBuzSchema>;

export const ScoreMessageSchema = z.object({
	type: z.literal("score"),
	team: TeamEnumSchema.nullable(),
	value: z.int(),
});
export type ScoreMessage = z.infer<typeof ScoreMessageSchema>;

export const RegisterMainScreenMessageSchema = z.object({
	type: z.literal("registerMainScreen"),
});
export type RegisterMainScreenMessage = z.infer<
	typeof RegisterMainScreenMessageSchema
>;

export const SongPlayMessageSchema = z.object({
	type: z.literal("song:play"),
	title: z.string(),
});
export type SongPlayMessage = z.infer<typeof SongPlayMessageSchema>;

export const SongPauseMessageSchema = z.object({
	type: z.literal("song:pause"),
});
export type SongPauseMessage = z.infer<typeof SongPauseMessageSchema>;

export const SongResumeMessageSchema = z.object({
	type: z.literal("song:resume"),
});
export type SongResumeMessage = z.infer<typeof SongResumeMessageSchema>;

export const MessageSchema = z.discriminatedUnion("type", [
	BuzMessageSchema,
	ResetBuzSchema,
	ScoreMessageSchema,
	RegisterMainScreenMessageSchema,
	SongPlayMessageSchema,
	SongPauseMessageSchema,
	SongResumeMessageSchema,
]);
export type Message = z.infer<typeof MessageSchema>;

export const ScoreResponseSchema = z.object({
	type: z.literal("scoreResponse"),
	team: TeamEnumSchema,
	value: z.int(),
});
export type ScoreResponse = z.infer<typeof ScoreResponseSchema>;

// Response: Server -> Browser
export const BuzResponseSchema = z.object({
	type: z.literal("buzResponse"),
	team: TeamEnumSchema,
});
export type BuzResponse = z.infer<typeof BuzResponseSchema>;

export const SongPlayResponseSchema = z.object({
	type: z.literal("song:play"),
	title: z.string(),
});
export type SongPlayResponse = z.infer<typeof SongPlayResponseSchema>;

export const SongPauseResponseSchema = z.object({
	type: z.literal("song:pause"),
});
export type SongPauseResponse = z.infer<typeof SongPauseResponseSchema>;

export const SongResumeResponseSchema = z.object({
	type: z.literal("song:resume"),
});
export type SongResumeResponse = z.infer<typeof SongResumeResponseSchema>;

export const ResponseSchema = z.discriminatedUnion("type", [
	ScoreResponseSchema,
	BuzResponseSchema,
	SongPlayResponseSchema,
	SongPauseResponseSchema,
	SongResumeResponseSchema,
]);
export type Response = z.infer<typeof ResponseSchema>;
