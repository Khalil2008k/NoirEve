"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SwitchProps {
    checked?: boolean;
    onCheckedChange?: (checked: boolean) => void;
    className?: string;
}

/**
 * Switch: Animated toggle switch with noir theme.
 * Uses red accent instead of yellow for NoirEve branding.
 */
const Switch = ({ checked = false, onCheckedChange, className }: SwitchProps) => {
    const [isChecked, setIsChecked] = useState(checked);

    const handleToggle = () => {
        const newValue = !isChecked;
        setIsChecked(newValue);
        onCheckedChange?.(newValue);
    };

    return (
        <motion.button
            role="switch"
            aria-checked={isChecked}
            onClick={handleToggle}
            className={cn(
                "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
                isChecked ? "bg-neutral-800" : "bg-neutral-700",
                className
            )}
            transition={{
                type: "spring",
                stiffness: 700,
                damping: 30,
            }}
        >
            <motion.span
                className={cn(
                    "inline-block h-5 w-5 rounded-full",
                    isChecked ? "bg-primary" : "bg-neutral-500"
                )}
                animate={{
                    x: isChecked ? 20 : 4,
                }}
                transition={{
                    type: "spring",
                    stiffness: 700,
                    damping: 30,
                    bounce: 0,
                }}
            >
                {isChecked && (
                    <motion.div
                        className="absolute h-full w-full z-0 rounded-full bg-primary blur-lg opacity-60"
                        initial={{
                            scale: 0,
                        }}
                        animate={{
                            scale: 1,
                        }}
                        transition={{
                            type: "spring",
                            duration: 0.02,
                        }}
                    />
                )}
            </motion.span>
        </motion.button>
    );
};

export default Switch;
