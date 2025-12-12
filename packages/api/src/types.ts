import { z } from "zod";

export const Team = ["red", "blue"] as const;
export const TeamEnumSchema = z.enum(Team);
export type TeamEnum = z.infer<typeof TeamEnumSchema>;

// Messages: Browser -> Server
export const BuzMessageSchema = z.object({
	type: z.literal("buz"),
	team: TeamEnumSchema,
});

export const ResetBuzSchema = z.object({ type: z.literal("resetBuzzer") });

export const ScoreMessageSchema = z.object({
	type: z.literal("score"),
	team: TeamEnumSchema.nullable(),
	value: z.int(),
});

export const RegisterMainScreenMessageSchema = z.object({
	type: z.literal("registerMainScreen"),
});

export const SongPlayMessageSchema = z.object({
	type: z.literal("song:play"),
	title: z.string(),
});

export const SongPauseMessageSchema = z.object({
	type: z.literal("song:pause"),
});

export const SongResumeMessageSchema = z.object({
	type: z.literal("song:resume"),
});

export const SongStopMessageSchema = z.object({
	type: z.literal("song:stop"),
});

export const MessageSchema = z.discriminatedUnion("type", [
	BuzMessageSchema,
	ResetBuzSchema,
	ScoreMessageSchema,
	RegisterMainScreenMessageSchema,
	SongPlayMessageSchema,
	SongPauseMessageSchema,
	SongResumeMessageSchema,
	SongStopMessageSchema,
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

export const SongPauseResponseSchema = z.object({
	type: z.literal("song:pause"),
});

export const SongResumeResponseSchema = z.object({
	type: z.literal("song:resume"),
});

export const ResponseSchema = z.discriminatedUnion("type", [
	ScoreResponseSchema,
	BuzResponseSchema,
	SongPlayResponseSchema,
	SongPauseResponseSchema,
	SongResumeResponseSchema,
	SongStopMessageSchema,
]);
export type Response = z.infer<typeof ResponseSchema>;
