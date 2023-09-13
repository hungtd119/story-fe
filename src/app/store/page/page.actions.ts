import { createAction, props } from '@ngrx/store';
import { Interaction } from 'src/app/models/interaction.model';
import { Page } from 'src/app/models/page.model';
import { Position } from 'src/app/models/position.model';
export const loadPages = createAction(
  '[Page PAGE] Load Pages',
  props<{ id: string; limit: number; pageNumber: number }>()
);
export const loadPagesSuccess = createAction(
  '[Page API] Load Pages Success',
  props<{ value: any }>()
);
export const loadPageInteractions = createAction(
  '[Page PAGE] Load Page interaction',
  props<{ value: Interaction[] }>()
);
export const loadPagesFailure = createAction(
  '[Page API] Load Page Failure',
  props<{ errorMsg: string }>()
);

export const loadPage = createAction(
  '[Page PAGE] Load Page',
  props<{ id: number }>()
);
export const loadPageToConfig = createAction(
  '[Page PAGE] Load Page To Config',
  props<{ id: string }>()
);
export const loadPagePlay = createAction(
  '[Page PAGE] Load Page Play',
  props<{ id: string }>()
);
export const loadPageToConfigByStoryId = createAction(
  '[Page PAGE] Load Page to config',
  props<{ storyId: string; pageId: string }>()
);
export const loadPageSuccess = createAction(
  '[Page API] Load Page Success',
  props<{ value: Page }>()
);
export const loadPagesId = createAction(
  '[Page PAGE] Load Pages Id',
  props<{ storyId: string }>()
);
export const loadPagesIdSuccess = createAction(
  '[Page API] Load Pages id Success',
  props<{ value: [] }>()
);
export const setPosition = createAction(
  '[Page Page] Set Position',
  props<{ value: Position; interactionId: number }>()
);
