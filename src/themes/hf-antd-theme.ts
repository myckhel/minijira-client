/**
 * Hugging Face Ant Design Theme Configuration
 * Complete theme override to make all Ant Design components reflect HF design system
 */

import type { ThemeConfig } from "antd";
import {
  HF_COLORS,
  HF_TYPOGRAPHY,
  HF_SHADOWS,
} from "../constants/hf-design-system";

export const hfAntdTheme: ThemeConfig = {
  token: {
    // === PRIMARY COLORS ===
    colorPrimary: HF_COLORS.hf[600], // #ff9d00 - HF Orange
    colorSuccess: HF_COLORS.success[500],
    colorWarning: HF_COLORS.warning[500],
    colorError: HF_COLORS.error[500],
    colorInfo: HF_COLORS.info[500],

    // === NEUTRAL COLORS ===
    colorText: HF_COLORS.neutral[900],
    colorTextSecondary: HF_COLORS.neutral[600],
    colorTextTertiary: HF_COLORS.neutral[500],
    colorTextQuaternary: HF_COLORS.neutral[400],
    colorTextDisabled: HF_COLORS.neutral[300],

    // === BACKGROUND COLORS ===
    colorBgContainer: "#ffffff",
    colorBgElevated: "#ffffff",
    colorBgLayout: HF_COLORS.neutral[50],
    colorBgSpotlight: HF_COLORS.hf[50],
    colorBgMask: "rgba(0, 0, 0, 0.45)",

    // === BORDER COLORS ===
    colorBorder: HF_COLORS.neutral[200],
    colorBorderSecondary: HF_COLORS.neutral[100],

    // === INTERACTION COLORS ===
    colorFill: HF_COLORS.neutral[100],
    colorFillSecondary: HF_COLORS.neutral[50],
    colorFillTertiary: HF_COLORS.neutral[50],
    colorFillQuaternary: HF_COLORS.neutral[50],

    // === TYPOGRAPHY ===
    fontFamily: HF_TYPOGRAPHY.fontFamily.sans.join(", "),
    fontSize: 14,
    fontSizeSM: 12,
    fontSizeLG: 16,
    fontSizeXL: 20,
    fontSizeHeading1: 38,
    fontSizeHeading2: 30,
    fontSizeHeading3: 24,
    fontSizeHeading4: 20,
    fontSizeHeading5: 16,

    // === SPACING ===
    padding: 16,
    paddingSM: 12,
    paddingLG: 24,
    paddingXL: 32,
    margin: 16,
    marginSM: 12,
    marginLG: 24,
    marginXL: 32,

    // === BORDER RADIUS ===
    borderRadius: 8,
    borderRadiusSM: 6,
    borderRadiusLG: 12,
    borderRadiusXS: 4,

    // === SHADOWS ===
    boxShadow: HF_SHADOWS.md,
    boxShadowSecondary: HF_SHADOWS.sm,
    boxShadowTertiary: HF_SHADOWS.lg,

    // === SIZING ===
    controlHeight: 40,
    controlHeightSM: 32,
    controlHeightLG: 48,
    controlHeightXS: 24,

    // === LINE HEIGHT ===
    lineHeight: 1.5,
    lineHeightHeading1: 1.25,

    // === MOTION ===
    motionDurationSlow: "0.3s",
    motionDurationMid: "0.2s",
    motionDurationFast: "0.15s",

    // === Z-INDEX ===
    zIndexPopupBase: 1000,
    zIndexBase: 0,
  },

  components: {
    // === BUTTON ===
    Button: {
      colorPrimary: HF_COLORS.hf[600],
      borderRadius: 8,
      controlHeight: 40,
      controlHeightSM: 32,
      controlHeightLG: 48,
      primaryShadow: `0 2px 8px ${HF_COLORS.hf[600]}20`,
    },

    // === INPUT ===
    Input: {
      borderRadius: 8,
      controlHeight: 40,
      controlHeightSM: 32,
      controlHeightLG: 48,
      paddingInline: 12,
    },

    // === SELECT ===
    Select: {
      borderRadius: 8,
      controlHeight: 40,
      controlHeightSM: 32,
      controlHeightLG: 48,
      optionSelectedBg: HF_COLORS.hf[50],
    },

    // === CARD ===
    Card: {
      borderRadiusLG: 12,
      boxShadowTertiary: HF_SHADOWS.md,
      paddingLG: 24,
    },

    // === TABLE ===
    Table: {
      headerBg: HF_COLORS.neutral[50],
      headerColor: HF_COLORS.neutral[800],
      rowHoverBg: HF_COLORS.hf[50],
      borderRadius: 8,
    },

    // === MENU ===
    Menu: {
      itemBg: "transparent",
      itemSelectedBg: HF_COLORS.hf[50],
      itemHoverBg: HF_COLORS.neutral[50],
      itemSelectedColor: HF_COLORS.hf[700],
      itemColor: HF_COLORS.neutral[700],
      iconSize: 16,
      borderRadius: 6,
    },

    // === LAYOUT ===
    Layout: {
      siderBg: "#ffffff",
      headerBg: "#ffffff",
      bodyBg: HF_COLORS.neutral[50],
      triggerBg: HF_COLORS.neutral[100],
      triggerColor: HF_COLORS.neutral[600],
    },

    // === MODAL ===
    Modal: {
      borderRadiusLG: 16,
      headerBg: "#ffffff",
      contentBg: "#ffffff",
      footerBg: HF_COLORS.neutral[50],
    },

    // === FORM ===
    Form: {
      labelColor: HF_COLORS.neutral[800],
      labelRequiredMarkColor: HF_COLORS.error[500],
      itemMarginBottom: 24,
    },

    // === MESSAGE ===
    Message: {
      borderRadius: 8,
      colorText: HF_COLORS.neutral[800],
    },

    // === NOTIFICATION ===
    Notification: {
      borderRadiusLG: 12,
      colorText: HF_COLORS.neutral[800],
    },

    // === BADGE ===
    Badge: {
      colorPrimary: HF_COLORS.hf[600],
      borderRadiusSM: 6,
    },

    // === TAG ===
    Tag: {
      borderRadiusSM: 6,
      defaultColor: HF_COLORS.neutral[700],
      defaultBg: HF_COLORS.neutral[50],
    },

    // === ALERT ===
    Alert: {
      borderRadiusLG: 8,
      colorText: HF_COLORS.neutral[800],
    },

    // === TABS ===
    Tabs: {
      itemSelectedColor: HF_COLORS.hf[700],
      itemHoverColor: HF_COLORS.hf[500],
      itemColor: HF_COLORS.neutral[600],
      borderRadius: 6,
    },

    // === TOOLTIP ===
    Tooltip: {
      borderRadius: 6,
      colorBgSpotlight: HF_COLORS.neutral[800],
      colorTextLightSolid: "#ffffff",
    },

    // === POPOVER ===
    Popover: {
      borderRadiusOuter: 8,
      colorBgElevated: "#ffffff",
    },

    // === DROPDOWN ===
    Dropdown: {
      borderRadius: 8,
      colorBgElevated: "#ffffff",
      controlItemBgHover: HF_COLORS.hf[50],
    },

    // === DRAWER ===
    Drawer: {
      colorBgElevated: "#ffffff",
    },

    // === SWITCH ===
    Switch: {
      borderRadius: 12,
      trackHeight: 22,
      trackMinWidth: 44,
      trackPadding: 2,
    },

    // === SLIDER ===
    Slider: {
      borderRadius: 6,
      trackBg: HF_COLORS.neutral[200],
      trackHoverBg: HF_COLORS.neutral[300],
    },

    // === PROGRESS ===
    Progress: {
      borderRadius: 6,
    },

    // === RATE ===
    Rate: {
      colorFillContent: HF_COLORS.hf[400],
      colorText: HF_COLORS.neutral[300],
    },

    // === CHECKBOX ===
    Checkbox: {
      borderRadiusSM: 4,
      controlInteractiveSize: 16,
    },

    // === RADIO ===
    Radio: {
      buttonCheckedBg: HF_COLORS.hf[50],
      buttonCheckedBgDisabled: HF_COLORS.neutral[100],
      borderRadius: 6,
    },

    // === DATE PICKER ===
    DatePicker: {
      borderRadius: 8,
      controlHeight: 40,
      controlHeightSM: 32,
      controlHeightLG: 48,
    },

    // === UPLOAD ===
    Upload: {
      borderRadius: 8,
    },

    // === SKELETON ===
    Skeleton: {
      color: HF_COLORS.neutral[100],
      colorGradientEnd: HF_COLORS.neutral[50],
      borderRadius: 6,
    },

    // === DIVIDER ===
    Divider: {
      colorSplit: HF_COLORS.neutral[200],
      colorText: HF_COLORS.neutral[500],
    },

    // === BREADCRUMB ===
    Breadcrumb: {
      colorText: HF_COLORS.neutral[600],
      colorTextDescription: HF_COLORS.neutral[500],
      linkColor: HF_COLORS.hf[600],
      linkHoverColor: HF_COLORS.hf[700],
      separatorColor: HF_COLORS.neutral[400],
    },

    // === PAGINATION ===
    Pagination: {
      borderRadius: 6,
      itemActiveBg: HF_COLORS.hf[600],
      itemSize: 32,
    },

    // === TYPOGRAPHY ===
    Typography: {
      titleMarginBottom: 16,
      titleMarginTop: 16,
      colorText: HF_COLORS.neutral[800],
      colorTextDescription: HF_COLORS.neutral[600],
      colorLink: HF_COLORS.hf[600],
      colorLinkHover: HF_COLORS.hf[700],
    },

    // === AVATAR ===
    Avatar: {
      borderRadius: 8,
      colorText: "#ffffff",
      colorTextPlaceholder: HF_COLORS.neutral[400],
      groupBorderColor: "#ffffff",
      groupOverlapping: -8,
    },

    // === COLLAPSE ===
    Collapse: {
      borderRadius: 8,
      headerBg: HF_COLORS.neutral[50],
      contentBg: "#ffffff",
    },

    // === SEGMENTED ===
    Segmented: {
      borderRadius: 8,
      itemSelectedBg: HF_COLORS.hf[600],
      trackBg: HF_COLORS.neutral[100],
      itemHoverBg: HF_COLORS.hf[50],
    },
  },
};
