import React from 'react';
import styled from 'styled-components';
import { BookOutlined } from '@ant-design/icons';
import { Button, Tag } from 'antd';
import { useHistory } from 'react-router-dom';
import { RecommendationContent, GlossaryTerm } from '../../../../types.generated';
import { navigateToSearchUrl } from '../../../search/utils/navigateToSearchUrl';
import { useEntityRegistry } from '../../../useEntityRegistry';
import { UnionType } from '../../../search/utils/constants';

const TermSearchListContainer = styled.div`
    display: flex;
    justify-content: left;
    align-items: center;
    flex-wrap: wrap;
`;

const TermContainer = styled.div`
    margin-bottom: 4px;
`;

const TermButton = styled(Button)`
    margin: 0px;
    padding: 0px;
    font-weight: 500;
`;

const StyledBook = styled(BookOutlined)`
    && {
        margin-right: 3px;
        padding-left: 2px;
        padding-bottom: 2px;
        font-size: 10px;
    }
`;

type Props = {
    content: Array<RecommendationContent>;
    onClick?: (index: number) => void;
};

export const GlossaryTermSearchList = ({ content, onClick }: Props) => {
    const history = useHistory();
    const entityRegistry = useEntityRegistry();

    const terms: Array<GlossaryTerm> = content
        .map((cnt) => cnt.entity)
        .filter((entity) => entity !== null && entity !== undefined)
        .map((entity) => entity as GlossaryTerm);

    const onClickTerm = (term: any, index: number) => {
        onClick?.(index);
        navigateToSearchUrl({
            filters: [
                {
                    field: 'glossaryTerms',
                    values: [term.urn],
                },
                {
                    field: 'fieldGlossaryTerms',
                    values: [term.urn],
                },
            ],
            history,
            unionType: UnionType.OR,
        });
    };

    return (
        <TermSearchListContainer>
            {terms.map((term, index) => (
                <TermContainer>
                    <TermButton type="link" key={term.urn} onClick={() => onClickTerm(term, index)}>
                        <Tag closable={false}>
                            <StyledBook />
                            {entityRegistry.getDisplayName(term.type, term)}
                        </Tag>
                    </TermButton>
                </TermContainer>
            ))}
        </TermSearchListContainer>
    );
};
