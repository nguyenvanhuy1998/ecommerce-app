import { Link } from "expo-router";
import React from "react";
import { StyleSheet, TouchableOpacity, ViewStyle } from "react-native";
import { spacing } from "../../constants/theme";
import { Row, Text } from "../ui";

interface AuthFooterProps {
    prompt: string;
    linkText: string;
    linkHref: any; // Using any for now to fix the type issue with expo-router paths
    style?: ViewStyle;
}

export default function AuthFooter({
    prompt,
    linkText,
    linkHref,
    style,
}: AuthFooterProps) {
    return (
        <Row
            align="center"
            justify="flex-start"
            style={{
                ...styles.container,
                ...(style || {}),
            }}
        >
            <Text variant="body2">{prompt} </Text>
            <Link href={linkHref} asChild>
                <TouchableOpacity>
                    <Text
                        color="text"
                        variant="body2"
                        bold
                        style={{
                            fontWeight: "bold",
                        }}
                    >
                        {linkText}
                    </Text>
                </TouchableOpacity>
            </Link>
        </Row>
    );
}
const styles = StyleSheet.create({
    container: {
        marginBottom: spacing.lg,
        marginTop: spacing.lg,
    },
});
