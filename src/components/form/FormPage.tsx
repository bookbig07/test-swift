import React , { useState , useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table , Form , Input , Select , DatePicker , Radio , Button , Checkbox , Modal } from 'antd';
import './FormPage.scss';
import Translation from '../translation/Translation'
import { useTranslation } from 'react-i18next';
import { TableFormData } from './FormData'
import { addFormData , loadFormData , deleteFormData , updateFormData , loadDataFromLocalStorage } from './FormSlice';
import type { CheckboxProps } from 'antd';
import moment from 'moment';

interface RootState {
    form: {
        TableForm: TableFormData[];
    };
}
  
function FormPage() {
    const [form] = Form.useForm();
    const [editform] = Form.useForm();
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [editDataRow, setisEditRow] = useState<TableFormData>();
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [checkAll, setCheckAll] = useState<boolean>(false);
    const tableForm = useSelector((state: RootState) => state.form.TableForm);

    useEffect(() => {
        const initialFormData = loadDataFromLocalStorage();
        dispatch(loadFormData(initialFormData));
    }, [dispatch]);

    const handleCheckAllChange: CheckboxProps['onChange'] = (e) => {
        const checked = e.target.checked
        setCheckAll(checked)
        setSelectedRowKeys(checked ? tableForm.map(item => item.key) : []);
    };
    
    const handleClearData = () => {
        form.resetFields();
    };

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const handleSubmit = (values: any) => {
        const formattedDateOfBirth = moment(values.dateofbirth).format('DD/MM/YYYY');
        values.dateofbirth = formattedDateOfBirth;
        values.key = Date.now()
        const { idcardIndex1, idcardIndex2, idcardIndex3, idcardIndex4, idcardIndex5, ...rest } = values;
        const idcard = `${idcardIndex1}${idcardIndex2}${idcardIndex3}${idcardIndex4}${idcardIndex5}`;
        dispatch(addFormData({ ...rest, idcard }));
    };

    const handleDeleteData = () => {
        selectedRowKeys.forEach(key => {
            dispatch(deleteFormData({ key }));
        });
        setCheckAll(!checkAll)
    }

    const EditFormData = (key: React.Key) => {
        setIsModalOpen(true);
        const rowToEdit = tableForm.find(value => value.key === key);
        setisEditRow(rowToEdit);
    }

    const handleOk = () => {
        setIsModalOpen(false);
        const editedData = editform.getFieldsValue();
        editedData.key = editDataRow?.key;
        dispatch(updateFormData(editedData as TableFormData));
        setisEditRow(undefined);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setisEditRow(undefined);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const columns = [
        {
            title: t("name"),
            dataIndex: 'name',
            key: 'name',
            render: (_: any, record: TableFormData) => `${t(record.prefixName)} ${record.firstName} ${record.lastName}`,
            sorter: (a: TableFormData, b: TableFormData) => {
                const nameA = `${a.prefixName} ${a.firstName} ${a.lastName}`;
                const nameB = `${b.prefixName} ${b.firstName} ${b.lastName}`;
                return nameA.localeCompare(nameB);
            },
        },
        {
            title: t('sex'),
            dataIndex: 'sex',
            key: 'sex',
            render: (_: any, record: TableFormData) => `${t(record.sex)}`,
            sorter: (a: TableFormData, b: TableFormData) => a.sex.localeCompare(b.sex),
        },
        {
            title: t("phonenumber"),
            dataIndex: 'phonenumber',
            key: 'phonenumber',
            render: (_: any, record: TableFormData) => `+${record.prefixphonenumber} ${record.phonenumber}`,
            sorter: (a: TableFormData, b: TableFormData) => {
                const phoneA = `+${a.prefixphonenumber} ${a.phonenumber}`;
                const phoneB = `+${b.prefixphonenumber} ${b.phonenumber}`;
                return phoneA.localeCompare(phoneB);
            },
        },
        {
            title: t("nationality"),
            dataIndex: 'nationality',
            key: 'nationality',
            render: (_: any, record: TableFormData) => `${t('nationality_' +record.nationality)}`,
            sorter: (a: TableFormData, b: TableFormData) => a.nationality.localeCompare(b.nationality),
        },
        {
            title: t("manage"),
            render: (_: any, record: TableFormData) => (
                <Button onClick={() => EditFormData(record.key)}>{t('edit')}</Button>
            ),
        }
    ]
    
    return (
        <>
            <Translation/>
            <div className="body-form">
                <div className="form">
                    <Form
                        form={form}
                        onFinish={handleSubmit}
                        initialValues={{
                            prefixName: '',
                            firstName: '',
                            lastName: '',
                            dateofbirth: null,
                            nationality: '',
                            sex: '',
                            idcardIndex1: '',
                            idcardIndex2: '',
                            idcardIndex3: '',
                            idcardIndex4: '',
                            idcardIndex5: '',
                            prefixphonenumber: '',
                            phonenumber: '',
                            passport: '',
                            salary: ''
                        }}
                    >
                        <div className="row">
                            <Form.Item 
                                key="prefixName"
                                name="prefixName"
                                label={t('prefixName')} 
                                style={{width : '170px', marginRight : '10px'}} 
                                rules={[{ required: true }]}
                            >
                                <Select
                                    placeholder={t('prefixName')}
                                >
                                    <Select.Option value="mr">{t('mr')}</Select.Option>
                                    <Select.Option value="mrs">{t('mrs')}</Select.Option>
                                    <Select.Option value="miss">{t('miss')}</Select.Option>
                                </Select>
                            </Form.Item>
                            <Form.Item name="firstName" label={t('firstName')} style={{width : '365px', marginRight : '10px'}} rules={[{ required: true } ]}>
                                <Input/>
                            </Form.Item>
                            <Form.Item name="lastName" label={t('lastName')} style={{width : '365px'}} rules={[{ required: true } ]}>
                                <Input/>
                            </Form.Item>
                        </div>
                        <div className="row">
                            <Form.Item name="dateofbirth" label={t('birthday')} style={{ marginRight : '50px'}} rules={[{ required: true } ]}>
                                <DatePicker 
                                    format="DD/MM/YYYY" 
                                    placeholder={t('birthdayType')} 
                                />
                            </Form.Item>
                            <Form.Item key="nationality" name="nationality" label={t('nationality')} style={{width : '400px'}} rules={[{ required: true }]}>
                                <Select 
                                    placeholder={t('select')}
                                >
                                    <Select.Option value="thai">{t('nationality_thai')}</Select.Option>
                                </Select>
                            </Form.Item>
                        </div>
                        <div className="row">
                            <Form.Item name="idcardIndex1" label={t('idcard')} style={{ width: '180px', marginRight: '10px' }}>
                                <Input maxLength={1}/>
                            </Form.Item>
                            <span className='dash'>-</span>
                            <Form.Item  name="idcardIndex2" style={{ width: '130px', marginRight: '10px' }}>
                                <Input maxLength={4}/>
                            </Form.Item>
                            <span className='dash'>-</span>
                            <Form.Item name="idcardIndex3" style={{ width: '130px', marginRight: '10px' }}>
                                <Input maxLength={5}/>
                            </Form.Item>
                            <span className='dash'>-</span>
                            <Form.Item name="idcardIndex4" style={{ width: '100px', marginRight: '10px' }}>
                                <Input maxLength={2}/>
                            </Form.Item>
                            <span className='dash'>-</span>
                            <Form.Item name="idcardIndex5" style={{ width: '67px' }}>
                                <Input maxLength={1}/>
                            </Form.Item>
                        </div>
                        <div className="row">
                            <Form.Item key="sex" name="sex" label={t('sex')} rules={[{ required: true } ]}>
                                <Radio.Group>
                                    <Radio value={'male'}>{t('male')}</Radio>
                                    <Radio value={'female'}>{t('female')}</Radio>
                                    <Radio value={'notspecified'}>{t('notspecified')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </div>
                        <div className="row">
                            <Form.Item key="prefixphonenumber" name="prefixphonenumber" label={t('phonenumber')} style={{width : '280px', marginRight : '10px'}} rules={[{ required: true }]}>
                                <Select>
                                    <Select.Option value="66">+66</Select.Option>
                                </Select>
                            </Form.Item>
                            <span className='dash'>-</span>
                            <Form.Item name="phonenumber" style={{width : '240px'}} rules={[{ required: true }]}>
                                <Input maxLength={9} style={{ textAlign : 'center'}}/>
                            </Form.Item>
                        </div>
                        <div className="row">
                            <Form.Item name="passport" label={t('passport')} style={{width : '365px'}}>
                                <Input/>
                            </Form.Item>
                        </div>
                        <div className="row">
                            <Form.Item name="salary" label={t('salary')} style={{width : '365px'}} rules={[{ required: true }]}>
                                <Input/>
                            </Form.Item>
                            <div className="button-box">
                                <Button onClick={handleClearData}>{t('cleardata')}</Button>
                                <Button htmlType="submit">{t('sendData')}</Button>
                            </div>
                        </div>
                    </Form>
                </div>

                <div className="table-data">
                    <div className="table-top">
                        <Form.Item>
                            <Checkbox onChange={handleCheckAllChange} checked={checkAll}>
                                {t("selectall")}
                            </Checkbox>
                        </Form.Item>
                        <Button onClick={handleDeleteData}>{t("delete")}</Button>
                    </div>
                    <Table rowSelection={rowSelection} columns={columns} dataSource={tableForm}></Table>
                </div>
            </div>
            <Modal title={`Edit Index ${editDataRow?.key.toString()}`} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Form form={editform} initialValues={editDataRow}>
                    <Form.Item name="prefixName" label={t('prefixName')}>
                        <Select placeholder={t('prefixName')}>
                            <Select.Option value="mr">{t('mr')}</Select.Option>
                            <Select.Option value="mrs">{t('mrs')}</Select.Option>
                            <Select.Option value="miss">{t('miss')}</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="firstName" label={t('firstName')}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="lastName" label={t('lastName')}>
                        <Input />
                    </Form.Item>
                    <Form.Item key="nationality" name="nationality" label={t('nationality')}>
                        <Select 
                            placeholder={t('select')}
                        >
                            <Select.Option value="thai">{t('nationality_thai')}</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="idcard" label={t('idcard')}>
                        <Input/>
                    </Form.Item>
                    <Form.Item key="sex" name="sex" label={t('sex')}>
                        <Radio.Group>
                            <Radio value={'male'}>{t('male')}</Radio>
                            <Radio value={'female'}>{t('female')}</Radio>
                            <Radio value={'notspecified'}>{t('notspecified')}</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item key="prefixphonenumber" name="prefixphonenumber" label={t('prefixphonenumber')} style={{ textAlign : 'center'}}>
                        <Select>
                            <Select.Option value="66">+66</Select.Option>
                        </Select>
                    </Form.Item>
                        <Form.Item name="phonenumber" label={t('phonenumber')}>
                        <Input maxLength={9} style={{ textAlign : 'center'}}/>
                    </Form.Item>
                    <Form.Item name="passport" label={t('passport')}>
                        <Input/>
                    </Form.Item>
                    <Form.Item name="salary" label={t('salary')}>
                        <Input/>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default FormPage