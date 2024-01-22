import React from 'react';
import { DocsThemeConfig } from 'nextra-theme-docs';

const config: DocsThemeConfig = {
  logo: <span>Naa Docs</span>,
  project: {
    link: 'https://github.com/hexuntao/naa',
  },
  docsRepositoryBase: 'https://github.com/hexuntao/naa/blob/main',
  useNextSeoProps() {
    return {
      titleTemplate: '%s – Naa',
    };
  },
  search: {
    placeholder: '搜索文档',
  },
  feedback: {
    content: '',
  },
  editLink: {
    text: () => '在 GitHub 上编辑本页 →',
  },
  footer: {
    text: '',
  },
};

export default config;
