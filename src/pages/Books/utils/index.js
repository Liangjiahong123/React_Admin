export function generateSelectOptions(Select, list) {
  const optionContainer = [];
  list.forEach((val, key) => {
    optionContainer.push(
      <Select.Option value={key} key={key}>
        {val}
      </Select.Option>
    );
  });
  return optionContainer;
}
