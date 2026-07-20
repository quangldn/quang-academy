import MDXComponents from '@theme-original/MDXComponents';
import Callout from '@site/src/components/Callout';
import Quiz from '@site/src/components/interactive/Quiz';
import DbConverter from '@site/src/components/interactive/DbConverter';
import ItuGridExplorer from '@site/src/components/interactive/ItuGridExplorer';
import LinkBudgetCalculator from '@site/src/components/interactive/LinkBudgetCalculator';
import ConstellationExplorer from '@site/src/components/interactive/ConstellationExplorer';
import NonlinearOptimizer from '@site/src/components/interactive/NonlinearOptimizer';
import CascadedFilterPenalty from '@site/src/components/interactive/CascadedFilterPenalty';
import OtnMapper from '@site/src/components/interactive/OtnMapper';

// Đăng ký component tương tác toàn cục -> dùng trực tiếp trong mọi file .mdx
export default {
  ...MDXComponents,
  Callout,
  Quiz,
  DbConverter,
  ItuGridExplorer,
  LinkBudgetCalculator,
  ConstellationExplorer,
  NonlinearOptimizer,
  CascadedFilterPenalty,
  OtnMapper,
};
