import Checkbox from '@/components/Checkbox';
import Section from '@/components/Section';
import useOptions from '@/stores/useOptions';

const Options = () => {
  const ignoreCost = useOptions((state) => state.ignoreCost);
  const showCost = useOptions((state) => state.showCost);
  const toggleIgnoreCost = useOptions((state) => state.toggleIgnoreCost);
  const toggleShowCost = useOptions((state) => state.toggleShowCost);

  return (
    <Section horizontal gap={24} title="Options">
      <Checkbox
        label="Show Tile Cost"
        id="show-cost"
        checked={showCost}
        onChange={toggleShowCost}
      />
      <Checkbox
        label="Ignore Tile Cost"
        id="ignore-cost"
        checked={ignoreCost}
        onChange={toggleIgnoreCost}
      />
    </Section>
  );
};

export default Options;
