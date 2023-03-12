import {
  IResourceComponentsProps,
  BaseRecord,
  useMany,
} from "@pankod/refine-core";
import {
  useTable,
  List,
  Table,
  Space,
  EditButton,
  MarkdownField,
  DeleteButton,
  useModalForm,
  useSelect,
  Form,
  Modal,
  Input,
  Select,
  UseModalFormReturnType,
  TagField,
  FilterDropdown,
} from "@pankod/refine-antd";

import React from "react";

import { ICategory } from "../categories";

interface ICustomer extends BaseRecord {
  category: ICategory;
  name: string;
  description?: string;
}

interface IModalForm extends UseModalFormReturnType {
  categorySelectProps: any;
}
const ModalForm = ({
  modalProps,
  formProps,
  categorySelectProps,
}: IModalForm) => {
  return (
    <Modal {...modalProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label="Category"
          name={["category", "id"]}
          rules={[{ required: true }]}
        >
          <Select {...categorySelectProps} />
        </Form.Item>
        <Form.Item label="Name" name={["name"]} rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          label="Institution"
          name={["institution"]}
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Nomor HP" name={["hp"]} rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Discount" name="discount">
          <Input.TextArea rows={5} />
        </Form.Item>
        <Form.Item label="Description" name="description">
          <Input.TextArea rows={5} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export const CustomerList: React.FC<IResourceComponentsProps> = () => {
  const { tableProps } = useTable({ syncWithLocation: true });

  const { data: categoryData, isLoading: categoryIsLoading } = useMany({
    resource: "categories",
    ids: tableProps?.dataSource?.map((item) => item?.category.id) ?? [],
    queryOptions: { enabled: !!tableProps?.dataSource },
  });

  const { selectProps: categorySelectProps } = useSelect({
    resource: "categories",
    optionLabel: "name",
  });

  const createModalForm: UseModalFormReturnType = useModalForm({
    action: "create",
    redirect: false,
  });
  const editModalForm: UseModalFormReturnType = useModalForm({
    action: "edit",
    redirect: false,
    warnWhenUnsavedChanges: true,
  });

  return (
    <>
      <List
        createButtonProps={{
          onClick: () => {
            createModalForm.show();
          },
        }}
      >
        <Table {...tableProps} rowKey="id">
          <Table.Column
            dataIndex={["category", "id"]}
            title="Category"
            render={(value) =>
              categoryIsLoading ? (
                <>Loading...</>
              ) : (
                <TagField
                  value={
                    // @ts-ignore:next-line
                    categoryData?.data?.data?.find(
                      (item: any) => item.id === value
                    )?.name
                  }
                />
              )
            }
            sorter={{ multiple: 1 }}
            filterDropdown={(props) => (
              <FilterDropdown {...props}>
                <Select
                  style={{ minWidth: 200 }}
                  mode="multiple"
                  placeholder="Select Category"
                  {...categorySelectProps}
                />
              </FilterDropdown>
            )}
          />
          <Table.Column
            dataIndex="name"
            title="Name"
            sorter={{ multiple: 2 }}
          />
          <Table.Column dataIndex="institution" title="Institution" />
          <Table.Column dataIndex="hp" title="Nomor HP" />
          <Table.Column
            dataIndex="discount"
            title="Discount"
            render={(value: any) => (
              <MarkdownField
                value={
                  value
                    ? value.length > 80
                      ? value.slice(0, 80) + "...."
                      : value.slice(0, 80)
                    : value
                }
              />
            )}
          />
          <Table.Column
            dataIndex="description"
            title="Description"
            render={(value: any) => (
              <MarkdownField
                value={
                  value
                    ? value.length > 80
                      ? value.slice(0, 80) + "...."
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
                  onClick={() => editModalForm.show(record.id)}
                />
                <DeleteButton hideText size="small" recordItemId={record.id} />
              </Space>
            )}
          />
        </Table>
      </List>

      <ModalForm
        categorySelectProps={categorySelectProps}
        {...createModalForm}
      />
      <ModalForm categorySelectProps={categorySelectProps} {...editModalForm} />
    </>
  );
};
