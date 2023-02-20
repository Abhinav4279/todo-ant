import { Button, Tag } from "antd";

export function getColumns(tagFilters) {
  const columns = [
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
      sorter: (a, b) => a.title.length - b.title.length,
      formItemProps: {
        rules: [
          {
            required: true,
            message: 'This field is required',
          },
          {
            max: 100,
            message: '100 char limit',
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
            message: 'This field is required',
          },
          {
            max: 1000,
            message: '1000 char limit',
          },
        ],
      },
    },
    //TODO: validation, dueDate >= creationDate
    {
      title: 'Due Date',
      dataIndex: 'dueDate',
      valueType: 'date',
      sorter: (a, b) => new Date(a.dueDate) - new Date(b.dueDate),
    },
  
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      tip: 'Add comma separated values. Eg. TAG1,TAG2',
      filters: tagFilters,
      onFilter: true,
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

  return columns;
}