'use client'
import { useState } from "react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Loader2 } from "lucide-react";
import { subscribeUserToStock } from "@/api/users/user-service";

interface Props {
    onSuccess: (message: string) => void,
    onError: (message: string) => void,
    symbol: string
}
export default function StockSubscription({ onSuccess, onError, symbol }: Props) {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const isEmailValid = /^\S+@\S+\.\S+$/.test(email);
    const canSubmit = isEmailValid

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!canSubmit) return;

        setLoading(true);

        try {
            const response = await subscribeUserToStock({ email, symbol })
            if (!response.status) {
                onError(response.message);
            }else{
            onSuccess(response.message);
            }
        } catch (err) {
            onError("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 p-4">
            <div>
                <Label htmlFor="email">Email</Label>
                <br/>
                <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>

            <Button type="submit" disabled={!canSubmit || loading} className="w-full bg-indigo-400">
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Toggle Subscription
            </Button>
        </form>
    );
}
