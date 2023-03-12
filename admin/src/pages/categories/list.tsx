import { IResourceComponentsProps, BaseRecord } from '@pankod/refine-core';
import {
  useTable,
  List,
  Table,
  Space,
  EditButton,
  MarkdownField,
  DeleteButton,
  useDrawerForm,
  Drawer,
  Create,
  Form,
  Input,
  Edit,
  UseDrawerFormReturnType,
} from '@pankod/refine-antd';

import React from 'react';

export interface ICategory extends BaseRecord {
  name: string;
  description?: string;
}

function DrawerForm(drawerForm: UseDrawerFormReturnType) {
  return (
    <Form {...drawerForm.formProps} layout="vertical">
      <Form.Item label="Name" name={['name']} rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Description" name={['description']}>
        <Input.TextArea rows={5} />
      </Form.Item>
    </Form>
  );
}
function ConditionalDrawerForm(drawerForm: UseDrawerFormReturnType) {
  if (drawerForm.id) {
    return (
      <Edit
        breadcrumb
        saveButtonProps={drawerForm.saveButtonProps}
        recordItemId={drawerForm.id}
      >
        <DrawerForm {...drawerForm} />
      </Edit>
    );
  }
  return (
    <Create breadcrumb saveButtonProps={drawerForm.saveButtonProps}>
      <DrawerForm {...drawerForm} />
    </Create>
  );
}

export const CategoryList: React.FC<IResourceComponentsProps> = () => {
  const { tableProps } = useTable({ syncWithLocation: true });

  const createDrawerForm: UseDrawerFormReturnType = useDrawerForm({
    action: 'create',
    redirect: false,
  });
  const editDrawerForm: UseDrawerFormReturnType = useDrawerForm({
    action: 'edit',
    redirect: false,
    warnWhenUnsavedChanges: true,
  });

  return (
    <>
      <List
        canCreate
        createButtonProps={{
          onClick: () => {
            createDrawerForm.show();
          },
        }}
      >
        <Table {...tableProps} rowKey="id">
          <Table.Column dataIndex="name" title="Name" sorter />
          <Table.Column
            dataIndex="description"
            title="Description"
            render={(value: any) => (
              <MarkdownField
                value={
                  value
                    ? value.length > 80
                      ? value.slice(0, 80) + '....'
                      : value.slice(0, 80)
                    : value
                }
              />
            )}
          />
          <Table.Column
            title="Actions"
            dataIndex="actions"
            render={(_, record: BaseRecord) => (
              <Space>
                <EditButton
                  hideText
                  size="small"
                  recordItemId={record.id}
                  onClick={() => editDrawerForm.show(record.id)}
                />
                <DeleteButton hideText size="small" recordItemId={record.id} />
              </Space>
            )}
          />
        </Table>
      </List>

      <Drawer {...createDrawerForm.drawerProps}>
        <ConditionalDrawerForm {...createDrawerForm} />
      </Drawer>
      <Drawer {...editDrawerForm.drawerProps}>
        <ConditionalDrawerForm {...editDrawerForm} />
      </Drawer>
    </>
  );
};
