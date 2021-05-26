import { Component, OnDestroy, OnInit, ViewChild,  } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy { 
  @ViewChild('f', {static: false }) slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;
  
  constructor(private slService: ShoppingListService) { }

  ngOnInit(): void {
    this.subscription = this.slService.startedEditing
      .subscribe(
        (index: number) => {
          this.editedItemIndex = index;
          this.editMode = true;
          this.editedItem = this.slService.getIngredient(index);
          this.slForm.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount,
            measurement: this.editedItem.measurement
          })
        }
      );
  }
  
  

  onAddItem(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount, value.measurement);
    if (this.editMode) {
      this.slService.updateIngredient(this.editedItemIndex, newIngredient)
    } else {
      this.slService.addIngredient(newIngredient);
    }
    form.reset();
    this.editMode = false;
  }

  onDeleteItem(form: NgForm) {
    this.slService.deleteIngredient(this.editedItemIndex)
    this.onClear();
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }

  onRemoveAllItems() {
    this.slService.deleteAllIngredient();
    this.onClear();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
