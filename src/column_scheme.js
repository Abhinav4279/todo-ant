const { Button, Tag } = require("antd");

export const columns = [
  {
    dataIndex: 'index',
    valueType: 'indexBorder',
    width: 48,
  },
  {
    title: 'Title',
    dataIndex: 'title',
    ellipsis: true,
    tip: 'If the title is too long, it will automatically shrink',
    formItemProps: {
      rules: [
        {
          required: true,
          message: 'This is required',
          max: 100,
        },
      ],
    },
  },
  {
    title: 'Description',
    dataIndex: 'description',
    ellipsis: true,
    tip: 'If the title is too long, it will automatically shrink',
    formItemProps: {
      rules: [
        {
          required: true,
          message: 'This is required',
          max: 1000,
        },
      ],
    },
  },
  {
    title: 'Due Date',
    dataIndex: 'dueDate',
    valueType: 'date',
    sorter: true,
    hideInSearch: true,
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    render: (_, { tags }) => (
      <>
        {tags?.map((tag) => {
          return (
            <Tag color='green' key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    disable: true,
    title: 'status',
    dataIndex: 'status',
    filters: true,
    onFilter: true,
    ellipsis: true,
    valueType: 'select',
    valueEnum: {
      all: { text: 'super long'.repeat(50) },
      open: {
        text: 'open',
        status: 'Error',
      },
      working: {
        text: 'working',
        status: 'Processing',
      },
      done: {
        text: 'done',
        status: 'Success',
        disabled: true,
      },
      overdue: {
        text: 'overdue',
        status: 'Error',
        disabled: true,
      },
    },
    formItemProps: {
      rules: [
        {
          required: true,
          message: 'This is required',
        },
      ],
    },
  },
  {
    title: 'operate',
    valueType: 'option',
    key: 'option',
    render: (text, record, _, action) => [
      <Button
        key="editable"
        type='link'
        onClick={() => {
          action?.startEditable?.(record.id);
        }}
      >
        edit
      </Button>,
      <Button
        key="editable"
        type='link'
        onClick={() => {
          action?.startEditable?.(record.id);
        }}
      >
        delete
      </Button>,
    ],
  },
];