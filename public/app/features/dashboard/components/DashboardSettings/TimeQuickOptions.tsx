import { css, cx } from '@emotion/css';
import React, { PureComponent } from 'react';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';

import { GrafanaTheme2, TimeOption } from '@grafana/data';
import { Icon, useStyles2 } from '@grafana/ui';

interface Props {
  quickOptions: TimeOption[];
  onQuickOptionsChange: (quickOptions: TimeOption[]) => void;
}

export class TimeQuickOptions extends PureComponent<Props> {

  onDragEnd = (result: DropResult) => {
    const { quickOptions, onQuickOptionsChange } = this.props;

    if (!result || !result.destination) {
      return;
    }

    const startIndex = result.source.index;
    const endIndex = result.destination.index;
    if (startIndex === endIndex) {
      return;
    }

    const update = Array.from(quickOptions);
    const [removed] = update.splice(startIndex, 1);
    update.splice(endIndex, 0, removed);
    onQuickOptionsChange(update);
  };

  render() {
    const { quickOptions } = this.props;
    const styles = useStyles2(getStyles);

    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId="quick-option-settings-droppable" direction="vertical">
          {(provided) => {
            return (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {quickOptions.map((quickOption, index) => {
                  return (
                    <Draggable draggableId="quick-option-settings-draggable" index={index} key={index}>
                      {(provided) => {
                        return (
                          <>
                            <div ref={provided.innerRef} className={styles.wrapper} {...provided.draggableProps}>
                              <div>
                                {quickOption.display}
                                  
                                <Icon
                                  title="Drag and drop to reorder"
                                  name="draggabledots"
                                  size="lg"
                                  className={styles.dragIcon}
                                  {...provided.dragHandleProps}
                                />
                              </div>
                            </div>
                          </>
                        );
                      }}
                    </Draggable>
                  );
                })}
              </div>
            );
          }}
        </Droppable>
      </DragDropContext>
    );
  }
}

const getStyles = (theme: GrafanaTheme2) => ({
  wrapper: css`
    label: Wrapper;
    display: flex;
    align-items: center;
    margin-left: ${theme.spacing(0.5)};
  `,
  header: css`
    label: Header;
    padding: ${theme.spacing(0.5, 0.5)};
    border-radius: ${theme.shape.borderRadius(1)};
    background: ${theme.colors.background.secondary};
    min-height: ${theme.spacing(4)};
    display: grid;
    grid-template-columns: minmax(100px, max-content) min-content;
    align-items: center;
    justify-content: space-between;
    white-space: nowrap;

    &:focus {
      outline: none;
    }
  `,
  column: css`
    label: Column;
    display: flex;
    align-items: center;
  `,
  dragIcon: css`
    cursor: grab;
    color: ${theme.colors.text.disabled};
    margin: ${theme.spacing(0, 0.5)};
    &:hover {
      color: ${theme.colors.text};
    }
  `,
  collapseIcon: css`
    margin-left: ${theme.spacing(0.5)};
    color: ${theme.colors.text.disabled};
    }
  `,
  titleWrapper: css`
    display: flex;
    align-items: center;
    flex-grow: 1;
    cursor: pointer;
    overflow: hidden;
    margin-right: ${theme.spacing(0.5)};
  `,
  title: css`
    font-weight: ${theme.typography.fontWeightBold};
    color: ${theme.colors.text.link};
    margin-left: ${theme.spacing(0.5)};
    overflow: hidden;
    text-overflow: ellipsis;
  `,
  disabled: css`
    color: ${theme.colors.text.disabled};
  `,
});
