"""empty message

Revision ID: 740ed4a36521
Revises: 
Create Date: 2024-10-25 17:31:10.883547

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '740ed4a36521'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('SPOT')
    op.drop_table('temp_table')
    op.drop_table('GRADE')
    op.alter_column('users', 'id',
               existing_type=sa.TEXT(),
               type_=sa.Integer(),
               existing_nullable=False,
               autoincrement=True)
    op.alter_column('users', 'password',
               existing_type=sa.TEXT(),
               type_=sa.String(),
               existing_nullable=False)
    op.alter_column('users', 'gender',
               existing_type=sa.TEXT(),
               type_=sa.Integer(),
               existing_nullable=False)
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('users', 'gender',
               existing_type=sa.Integer(),
               type_=sa.TEXT(),
               existing_nullable=False)
    op.alter_column('users', 'password',
               existing_type=sa.String(),
               type_=sa.TEXT(),
               existing_nullable=False)
    op.alter_column('users', 'id',
               existing_type=sa.Integer(),
               type_=sa.TEXT(),
               existing_nullable=False,
               autoincrement=True)
    op.create_table('GRADE',
    sa.Column('ID', sa.INTEGER(), nullable=True),
    sa.Column('관광지', sa.TEXT(), nullable=True),
    sa.Column('성별', sa.INTEGER(), nullable=True),
    sa.Column('나이', sa.INTEGER(), nullable=True),
    sa.Column('관계', sa.INTEGER(), nullable=True),
    sa.Column('평점', sa.INTEGER(), nullable=True),
    sa.Column('지역', sa.TEXT(), nullable=True),
    sa.PrimaryKeyConstraint('ID')
    )
    op.create_table('temp_table',
    sa.Column('관광지', sa.TEXT(), nullable=True),
    sa.Column('성별', sa.INTEGER(), nullable=True),
    sa.Column('나이', sa.INTEGER(), nullable=True),
    sa.Column('관계', sa.INTEGER(), nullable=True),
    sa.Column('평점', sa.INTEGER(), nullable=True),
    sa.Column('지역', sa.TEXT(), nullable=True),
    sa.Column('ID', sa.INTEGER(), nullable=True)
    )
    op.create_table('SPOT',
    sa.Column('ATTRACTION_NAME', sa.TEXT(), nullable=True),
    sa.Column('주소', sa.TEXT(), nullable=True),
    sa.Column('위도', sa.REAL(), nullable=True),
    sa.Column('경도', sa.REAL(), nullable=True),
    sa.Column('LOCATION_ID', sa.TEXT(), nullable=True)
    )
    # ### end Alembic commands ###
