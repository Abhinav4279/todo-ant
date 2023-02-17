const { Button, Tag } = require("antd");

export const columns = [
  {
    dataIndex: 'index',
    valueType: 'indexBorder',
    width: 48,
  },
  {
    title: 'Created on',
    dataIndex: 'creationDate',
    valueType: 'date',
    editable: false,
    
    sorter: (a, b) => a.creationDate - b.creationDate,
  },
  {
    title: 'Title',
    dataIndex: 'title',
    ellipsis: true,
    sorter: (a, b) => a.title.length - b.title.length,
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
    sorter: (a, b) => a.description.length - b.description.length,
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
    sorter: (a, b) => new Date(a.dueDate) - new Date(b.dueDate),
  },

  //TODO: handling multiple tags
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    filters: true,
    render: (_, { tags }) => (
      <>
        {tags && tags?.map((tag) => {
          return (
            <Tag color='green' key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },

  //TODO: set open as default
  {
    title: 'Status',
    dataIndex: 'status',
    filters: true,
    onFilter: true,
    ellipsis: true,
    valueType: 'select',
    valueEnum: {
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
      },
      overdue: {
        text: 'overdue',
        status: 'Error',
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
    title: 'Edit',
    valueType: 'option',
    key: 'option',
    render: (text, record, _, action) => [
      <Button
      type="link"
      key="editable"
      onClick={() => {
        action?.startEditable?.(record.id);
      }}
    >
      edit
    </Button>,
    ],
  },
];