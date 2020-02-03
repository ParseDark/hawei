import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

const Article = styled.span`
     :hover {
         text-decoration: underline
     }
`;

const MoreText = styled.div`
    text-align: right;
`

const ArticlesList = ({ list }) => {
    return (
        <>
            {
                list.map(({ node }) => (
                    <>
                        <div key={node.id}>
                            <span>> </span>
                            <Link
                                to={node.fields.slug}
                            >
                                <Article>
                                    {node.frontmatter.title}{" "}
                                </Article>
                            </Link>
                        </div>
                    </>
                ))
            }
            <MoreText>
                <Link
                    to="/allArticles"
                >
                    <Article>more >></Article>
                </Link>
            </MoreText>

        </>
    )
}

export default ArticlesList;