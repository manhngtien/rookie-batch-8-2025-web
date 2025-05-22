// eslint-plugin-require-id/lib/rules/require-id-on-important-elements.js
export default {
  meta: {
    type: "suggestion",
    docs: {
      description: "Require id attribute on important elements for testing",
    },
    schema: [
      {
        type: "object",
        properties: {
          tags: {
            type: "array",
            items: { type: "string" },
          },
        },
        additionalProperties: false,
      },
    ],
  },
  create(context) {
    const importantTags = context.options?.[0]?.tags || [
      "input",
      "button",
      "select",
      "textarea",
      "form",
    ];

    return {
      JSXOpeningElement(node) {
        const tagName = node.name.name;
        const hasIdOrTestId = node.attributes.some(
          (attr) =>
            attr.type === "JSXAttribute" &&
            (attr.name.name === "id" || attr.name.name === "data-testid"),
        );

        if (importantTags.includes(tagName) && !hasIdOrTestId) {
          context.report({
            node,
            message: `<${tagName}> is missing an id or data-testid attribute.`,
          });
        }
      },
    };
  },
};
