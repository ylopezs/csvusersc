import React from "react";
import qs from 'qs';
import 'antd/dist/antd.css';
import { Table, Input, Button, Space } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';

const getRandomuserParams = params => ({
    results: params.pagination.pageSize,
    page: params.pagination.current,
    ...params,
});

class People extends React.Component {
    state = {
        data: [],
        pagination: {
            current: 1,
            pageSize: 10,
        },
        loading: false,
        searchText: '',
        searchedColumn: ''
    };

    componentDidMount() {
        const { pagination } = this.state;
        this.fetch({ pagination });
    }

    handleTableChange = (pagination, filters, sorter) => {
        this.fetch({
            sortField: sorter.field,
            sortOrder: sorter.order,
            pagination,
            ...filters,
        });
    };

    fetch = (params = {}) => {
        this.setState({ loading: true });
        fetch(`api/v1/people/index?${qs.stringify(getRandomuserParams(params))}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                let result = data.map(person => {
                    return {
                        "id": person.id,
                        "key": person.key,
                        "name": person.name,
                        "location": person.locations.map(location => location.name).join(", "),
                        "species": person.species,
                        "gender": person.gender,
                        "affiliations": person.affiliations.map(affiliation => affiliation.name).join(", "),
                        "weapon": person.weapon,
                        "vehicle": person.vehicle,
                    }
                });
                this.setState({
                    loading: false,
                    data: result,
                    pagination: {
                        ...params.pagination,
                        total: 200,
                        // 200 is mock data, you should read it from server
                        // total: data.totalCount,
                    },
                });
            });
    };

    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={node => {
                        this.searchInput = node;
                    }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({ closeDropdown: false });
                            this.setState({
                                searchText: selectedKeys[0],
                                searchedColumn: dataIndex,
                            });
                        }}
                    >
                        Filter
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) =>
            record[dataIndex]
                ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
                : '',
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => this.searchInput.select(), 100);
            }
        },
        render: text =>
            this.state.searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[this.state.searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        this.setState({
            searchText: selectedKeys[0],
            searchedColumn: dataIndex,
        });
    };

    handleReset = clearFilters => {
        clearFilters();
        this.setState({ searchText: '' });
    };

    render() {
        const { data, pagination, loading } = this.state;
        const columns = [
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
                width: '20%',
                ...this.getColumnSearchProps('name'),
                sorter: (a, b) => a.name.length - b.name.length,
                sortDirections: ['descend', 'ascend'],
            },
            {
                title: 'Location',
                dataIndex: 'location',
                key: 'location',
                width: '20%',
                ...this.getColumnSearchProps('location'),
                sorter: (a, b) => a.location.length - b.location.length,
                sortDirections: ['descend', 'ascend'],
            },
            {
                title: 'Species',
                dataIndex: 'species',
                key: 'species',
                width: '10%',
                ...this.getColumnSearchProps('species'),
                sorter: (a, b) => a.species.length - b.species.length,
                sortDirections: ['descend', 'ascend'],
            },
            {
                title: 'Gender',
                dataIndex: 'gender',
                key: 'gender',
                width: '8%',
                ...this.getColumnSearchProps('gender'),
                sorter: (a, b) => a.gender.length - b.gender.length,
                sortDirections: ['descend', 'ascend'],
            },
            {
                title: 'Affiliations',
                dataIndex: 'afiiliations',
                key: 'affiliations',
                width: '20%',
                ...this.getColumnSearchProps('affiliations'),
                sorter: (a, b) => a.affiliations.length - b.affiliations.length,
                sortDirections: ['descend', 'ascend'],
            },
            {
                title: 'Weapon',
                dataIndex: 'weapon',
                key: 'weapon',
                width: '10%',
                ...this.getColumnSearchProps('weapon'),
                sorter: (a, b) => a.weapon.length - b.weapon.length,
                sortDirections: ['descend', 'ascend'],
            },
            {
                title: 'Vehicle',
                dataIndex: 'vehicle',
                key: 'vehicle',
                width: '12%',
                ...this.getColumnSearchProps('vehicle'),
                sorter: (a, b) => a.vehicle.length - b.vehicle.length,
                sortDirections: ['descend', 'ascend'],
            },
        ];

        return (
            <Table
                columns={columns}
                // rowKey={record => record.login.uuid}
                dataSource={data}
                pagination={pagination}
                loading={loading}
                onChange={this.handleTableChange}
            />
        );
    }
}

export default People;