import { scaleFontSize } from "../utils/responsive";

/**
 * Hệ thống typography nhất quán cho toàn bộ ứng dụng
 */
export const typography = {
    // Font families
    fontFamily: {
        primary: undefined, // Mặc định của hệ thống
        secondary: undefined, // Mặc định của hệ thống
        bold: undefined, // Mặc định của hệ thống
    },

    // Font sizes
    fontSize: {
        tiny: scaleFontSize(10),
        xs: scaleFontSize(12),
        sm: scaleFontSize(14),
        md: scaleFontSize(16),
        lg: scaleFontSize(18),
        xl: scaleFontSize(20),
        xxl: scaleFontSize(24),
        xxxl: scaleFontSize(30),
        huge: scaleFontSize(36),
        massive: scaleFontSize(48),
    },

    // Line heights
    lineHeight: {
        tight: 1.2,
        normal: 1.5,
        loose: 1.8,
    },

    // Các kiểu text định sẵn
    textPresets: {
        // Tiêu đề
        title1: {
            fontSize: scaleFontSize(30),
            fontWeight: "700",
            lineHeight: 1.2,
        },
        title2: {
            fontSize: scaleFontSize(24),
            fontWeight: "700",
            lineHeight: 1.2,
        },
        title3: {
            fontSize: scaleFontSize(20),
            fontWeight: "600",
            lineHeight: 1.2,
        },

        // Nội dung
        body1: {
            fontSize: scaleFontSize(16),
            fontWeight: "400",
            lineHeight: 1.5,
        },
        body2: {
            fontSize: scaleFontSize(14),
            fontWeight: "400",
            lineHeight: 1.5,
        },

        // Khác
        button: {
            fontSize: scaleFontSize(16),
            fontWeight: "600",
            lineHeight: 1.5,
        },
        caption: {
            fontSize: scaleFontSize(12),
            fontWeight: "400",
            lineHeight: 1.5,
        },
    },
};

export default typography;
