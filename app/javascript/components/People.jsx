import React from "react";
import { Table } from 'antd';
import qs from 'qs';

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        width: '20%',
    },
    {
        title: 'Location',
        dataIndex: 'location',
        key: 'location',
        width: '20%',
    },
    {
        title: 'Species',
        dataIndex: 'species',
        key: 'species',
        width: '10%',
    },
    {
        title: 'Gender',
        dataIndex: 'gender',
        key: 'gender',
        width: '8%',
    },
    {
        title: 'Affiliations',
        dataIndex: 'afiiliations',
        key: 'affiliations',
        width: '20%',
    },
    {
        title: 'Weapon',
        dataIndex: 'weapon',
        key: 'weapon',
        width: '10%',
    },
    {
        title: 'Vehicle',
        dataIndex: 'vehicle',
        key: 'vehicle',
        width: '12%',
    },
];

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

    render() {
        const { data, pagination, loading } = this.state;
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