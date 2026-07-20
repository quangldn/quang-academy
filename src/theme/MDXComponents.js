import MDXComponents from '@theme-original/MDXComponents';
import Callout from '@site/src/components/Callout';
import Quiz from '@site/src/components/interactive/Quiz';
import DbConverter from '@site/src/components/interactive/DbConverter';
import ItuGridExplorer from '@site/src/components/interactive/ItuGridExplorer';
import LinkBudgetCalculator from '@site/src/components/interactive/LinkBudgetCalculator';
import ConstellationExplorer from '@site/src/components/interactive/ConstellationExplorer';

// Đăng ký component tương tác toàn cục -> dùng trực tiếp trong mọi file .mdx
export default {
  ...MDXComponents,
  Callout,
  Quiz,
  DbConverter,
  ItuGridExplorer,
  LinkBudgetCalculator,
  ConstellationExplorer,
};
